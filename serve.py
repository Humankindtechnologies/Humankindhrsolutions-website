import os
import http.server
import socketserver

os.chdir(os.path.dirname(os.path.abspath(__file__)))

PORT = 5544


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def handle_error(self, request, client_address):
        # Silently swallow connection resets (common from Chrome prefetch)
        pass

    def log_message(self, format, *args):
        # Suppress noisy 404s for missing placeholder images
        pass


class StableServer(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True

    def handle_error(self, request, client_address):
        pass


with StableServer(('', PORT), NoCacheHandler) as httpd:
    print(f'Serving HRKIND on http://localhost:{PORT}')
    httpd.serve_forever()

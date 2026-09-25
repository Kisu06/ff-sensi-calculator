import http.server
import socketserver
import os

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        # Support clean URLs locally (e.g., /about -> /about.html)
        path_without_query = self.path.split('?')[0].split('#')[0]
        local_path = os.path.join(DIRECTORY, path_without_query.lstrip('/'))
        
        if not os.path.exists(local_path) and os.path.exists(local_path + ".html"):
            self.path = path_without_query + ".html"
            
        return super().do_GET()

    def send_error(self, code, message=None, explain=None):
        if code == 404:
            err_file = os.path.join(DIRECTORY, "404.html")
            if os.path.exists(err_file):
                self.send_response(404)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                with open(err_file, "rb") as f:
                    content = f.read()
                self.send_header("Content-Length", str(len(content)))
                self.end_headers()
                self.wfile.write(content)
                return
        super().send_error(code, message, explain)

if __name__ == "__main__":
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
        print(f"Custom dev server running at http://localhost:{PORT}")
        httpd.serve_forever()

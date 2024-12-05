from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.context_processor
def inject_script():
    def main_script():
        return """
        <script>
        document.addEventListener('DOMContentLoaded', function() {
            const bar = document.getElementById('bar');
            const close = document.getElementById('close');
            const nav = document.getElementById('navbar');

            if (bar) {
                bar.addEventListener('click', function() {
                    nav.classList.add('active');
                });
            }

            if (close) {
                close.addEventListener('click', function() {
                    nav.classList.remove('active');
                });
            }
        });
        </script>
        """
    return dict(main_script=main_script)

if __name__ == '__main__':
    app.run(debug=True)
from flask import Flask, render_template, request, redirect
import mysql.connector

app = Flask(__name__)

# Configuração do banco de dados MySQL
db = mysql.connector.connect(
    host="localhost",  # endereço do servidor MySQL
    user="root",  # usuário do MySQL
    password="Dunk7200!m",  # senha do MySQL
    database="pi2024"  # banco de dados
)

@app.route('/')
def index():
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM usuarios")
    results = cursor.fetchall()
    cursor.close()
    return render_template('form.html', data=results)

@app.route('/submit', methods=['POST'])
def submit():
    nome = request.form['nome']
    email = request.form['email']
    
    cursor = db.cursor()
    sql = "INSERT INTO usuarios (nome, email) VALUES (%s, %s)"
    values = (nome, email)
    cursor.execute(sql, values)
    db.commit()
    cursor.close()
    
    return redirect('/')

if __name__ == '__main__':
    app.run(debug=True)

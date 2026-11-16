// ============================================================
// CodeGuard AI — Sample Code Snippets for Demo
// ============================================================

export const SAMPLE_CODES: Record<string, { language: string; code: string; description: string }> = {
  js_vulnerable: {
    language: "javascript",
    description: "JavaScript with SQL Injection & XSS",
    code: `// User Authentication Module
const mysql = require('mysql');
const express = require('express');
const app = express();

const DB_PASSWORD = "admin123"; // hardcoded password
const API_KEY = "sk-1234567890abcdef"; // exposed secret

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: DB_PASSWORD,
  database: 'users_db'
});

app.get('/user', (req, res) => {
  const userId = req.query.id;
  
  // SQL Injection vulnerability
  const query = "SELECT * FROM users WHERE id = " + userId;
  
  connection.query(query, (err, results) => {
    if (err) throw err;
    
    // XSS vulnerability - directly injecting user input into HTML
    res.send('<h1>User: ' + results[0].name + '</h1>');
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // No password hashing
  const query = \`SELECT * FROM users WHERE username='\${username}' AND password='\${password}'\`;
  
  connection.query(query, (err, results) => {
    if (results.length > 0) {
      // No session management, exposing all user data
      res.json({ success: true, user: results[0] });
    }
  });
});

// Unused function (dead code)
function oldAuthMethod(user) {
  var x = 0;
  for (var i = 0; i < 1000000; i++) {
    x = x + i;
  }
  return x;
}

app.listen(3000);`,
  },

  python_bugs: {
    language: "python",
    description: "Python with memory leaks & bugs",
    code: `import os
import pickle
import subprocess
from flask import Flask, request, jsonify

app = Flask(__name__)
SECRET_KEY = "super_secret_key_123"  # Hardcoded secret

# Global mutable state - memory leak risk
cache = []
user_sessions = {}

def process_data(data):
    # No input validation
    result = eval(data)  # Code injection vulnerability!
    return result

@app.route('/execute', methods=['POST'])
def execute_command():
    # Command injection vulnerability
    cmd = request.json.get('command')
    output = subprocess.check_output(cmd, shell=True)  # Dangerous!
    return jsonify({'output': output.decode()})

@app.route('/load', methods=['POST'])
def load_data():
    # Insecure deserialization
    data = request.data
    obj = pickle.loads(data)  # Pickle injection risk!
    return jsonify({'loaded': str(obj)})

def divide(a, b):
    # No zero division check
    return a / b

def get_user(user_id):
    # Potential None reference
    users = None
    return users[user_id]  # Will throw TypeError

class DatabaseConnection:
    def __init__(self):
        self.connection = None
    
    def connect(self):
        # Connection never closed - resource leak
        import sqlite3
        self.connection = sqlite3.connect('db.sqlite')
    
    def query(self, sql, params):
        # No parameterized queries
        cursor = self.connection.cursor()
        cursor.execute(f"SELECT * FROM users WHERE id = {params}")
        return cursor.fetchall()

# Infinite recursion risk
def factorial(n):
    return n * factorial(n - 1)  # Missing base case!

if __name__ == '__main__':
    app.run(debug=True)  # Debug mode in production!`,
  },

  ts_quality: {
    language: "typescript",
    description: "TypeScript with type safety issues",
    code: `// E-commerce Cart Service
interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

class CartService {
  private items: any[] = []; // Using 'any' defeats type safety
  
  // No return type annotation
  addItem(product, quantity) {
    if (quantity <= 0) {
      return; // Silent failure - should throw
    }
    
    // No stock validation
    this.items.push({ product, quantity });
    
    // Magic number - should be constant
    if (this.items.length > 50) {
      console.log("Cart is full");
      return;
    }
  }
  
  // O(n²) complexity - performance issue
  removeDuplicates() {
    const unique = [];
    for (let i = 0; i < this.items.length; i++) {
      let isDuplicate = false;
      for (let j = 0; j < unique.length; j++) {
        if (this.items[i].product.id === unique[j].product.id) {
          isDuplicate = true;
        }
      }
      if (!isDuplicate) {
        unique.push(this.items[i]);
      }
    }
    this.items = unique;
  }
  
  // No null checks
  getTotal(): number {
    let total = 0;
    this.items.forEach(item => {
      total += item.product.price * item.quantity; // Could throw if product is null
    });
    return total;
  }
  
  // Async function without proper error handling
  async checkout(userId: string) {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify({ userId, items: this.items })
      // Missing: headers, error handling, timeout
    });
    
    const data = response.json(); // Missing await!
    return data;
  }
  
  // Dead code
  private _oldCalculate(items: any[]) {
    return items.reduce((acc, item) => acc + item.price, 0);
  }
}

// Global state mutation - anti-pattern
let globalCart = new CartService();
export { globalCart };`,
  },
};

export const LANGUAGE_ICONS: Record<string, string> = {
  javascript: "🟨",
  typescript: "🔷",
  python: "🐍",
  java: "☕",
  cpp: "⚙️",
  c: "🔧",
  go: "🐹",
  rust: "🦀",
  php: "🐘",
  ruby: "💎",
  swift: "🍎",
  kotlin: "🎯",
  csharp: "🔵",
  html: "🌐",
  css: "🎨",
  sql: "🗄️",
  auto: "🤖",
};

export const SEVERITY_COLORS: Record<string, string> = {
  critical: "badge-critical",
  high: "badge-warning",
  medium: "badge-info",
  low: "badge-success",
  info: "badge-success",
};

export const CATEGORY_ICONS: Record<string, string> = {
  bug: "🐛",
  security: "🔒",
  performance: "⚡",
  code_quality: "✨",
  maintainability: "🔧",
  best_practice: "📋",
  documentation: "📝",
  type_safety: "🛡️",
  memory_leak: "💧",
  dead_code: "💀",
};

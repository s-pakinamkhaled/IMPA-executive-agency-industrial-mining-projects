// In-memory user storage (can be replaced with database)
class User {
  constructor(id, username, password, role = 'admin') {
    this.id = id;
    this.username = username;
    this.password = password;
    this.role = role;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  // Static method to create a new user
  static create(username, password, role = 'admin') {
    const id = Date.now().toString();
    return new User(id, username, password, role);
  }

  // Method to update user
  update(data) {
    Object.assign(this, data);
    this.updatedAt = new Date();
    return this;
  }

  // Method to check if password matches
  checkPassword(password) {
    return this.password === password;
  }

  // Method to get user without password
  toJSON() {
    const { password, ...userWithoutPassword } = this;
    return userWithoutPassword;
  }
}

// Initialize with default admin user
const users = [
  User.create('impa2025', '1234', 'admin')
];

// Export the class and storage
module.exports = { User, users }; 
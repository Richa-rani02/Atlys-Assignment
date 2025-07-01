// Authentication service using localStorage for demo purposes

const USERS_KEY = 'foo-rum-users';
const DEMO_USERS = [
  { email: 'demo@example.com', password: 'password123' },
  { email: 'test@user.com', password: 'testpass' },
];

function getUsers() {
  let users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  // Ensure demo users are always present
  DEMO_USERS.forEach(demo => {
    if (!users.find(u => u.email === demo.email)) {
      users.push(demo);
    }
  });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return users;
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function signUp({ email, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getUsers();
      if (!email || !password) {
        reject({ message: 'Email and password are required.' });
        return;
      }
      if (DEMO_USERS.find(u => u.email === email)) {
        reject({ message: 'This is a demo account. Please sign in instead.' });
        return;
      }
      if (users.find(u => u.email === email)) {
        reject({ message: 'User already exists.' });
        return;
      }
      const user = { email, password };
      users.push(user);
      saveUsers(users);
      resolve({ email });
    }, 500);
  });
}

export function signIn({ email, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getUsers();
      const user = users.find(u => u.email === email && u.password === password);
      if (!user) {
        reject({ message: 'Invalid email or password.' });
        return;
      }
      resolve({ email });
    }, 500);
  });
} 
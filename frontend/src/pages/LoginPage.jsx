import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import styles from './LoginPage.module.css';

// In a real app, these roles might come from an API endpoint
const ROLES = ['admin', 'faculty', 'student'];

function LoginPage() {
  const [selectedRole, setSelectedRole] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
    setPassword('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedRole) {
      toast.error('Please select a role!');
      return;
    }

    if (!password) {
      toast.error('Please enter your password!');
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/auth/login`,
        {
          role: selectedRole,
          password,
        }
      );

      if (response.data.success) {
        localStorage.setItem('token', response.data.data);
        toast.success('Login successful!');
        navigate('/'); // Redirect to dashboard
      } else {
        toast.error(response.data.message || 'Login failed.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      const errorMessage =
        error.response?.data?.message || 'Login failed. Please try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Login Page</h1>
        <p className={styles.subtitle}>Select your role to continue</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Select Role</label>
          <select
            className={styles.select}
            value={selectedRole}
            onChange={handleRoleChange}
          >
            <option value="">Choose your role...</option>
            {ROLES.map((role, index) => (
              <option key={index} value={role}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {selectedRole && (
          <div className={styles.formGroup}>
            <label className={styles.label}>Enter Password</label>
            <input
              type="password"
              className={styles.input}
              placeholder="Enter your password..."
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
        )}

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={!selectedRole || !password}
        >
          Login
        </button>
      </form>

      <div className={styles.footer}>
        <p>Secure access to your university portal</p>
      </div>
    </div>
  );
}

export default LoginPage;
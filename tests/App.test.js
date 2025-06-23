import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
 
// Mock de fetch pour simuler l'appel API
global.fetch = jest.fn();
 
describe('App Component Tests', () => {
  const mockEmployees = [
    { id: 1, name: 'John Doe', role: 'Developer' },
    { id: 2, name: 'Jane Smith', role: 'Manager' }
  ];
 
  beforeEach(() => {
    // Configuration du mock de fetch pour retourner des données de test
    fetch.mockClear();
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockEmployees)
    });
 
    // Mock de process.env avec une valeur fixe pour les tests
    process.env.REACT_APP_API_URL = 'http://localhost:8000';
  });
 
  test('renders employee list heading', () => {
    render(<App />);
    expect(screen.getByText('Liste des employés')).toBeInTheDocument();
  });
 
  test('calls fetch with correct URL', () => {
    render(<App />);
    expect(fetch).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/employees`);
  });
 
  test('displays employees after data is loaded', async () => {
    render(<App />);
   
    // Attendre que le premier élément soit affiché
    await waitFor(() => {
      expect(screen.getByText('John Doe - Developer')).toBeInTheDocument();
    });
    
    // Vérifier le second élément séparément
    expect(screen.getByText('Jane Smith - Manager')).toBeInTheDocument();
  });
 
  test('renders empty list when no employees are returned', async () => {
    // Reset the mock to return empty array
    fetch.mockReset();
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce([])
    });
   
    render(<App />);
   
    // Vérifier qu'aucun élément li n'est affiché
    await waitFor(() => {
      const listItems = screen.queryAllByRole('listitem');
      expect(listItems.length).toBe(0);
    });
  });
});
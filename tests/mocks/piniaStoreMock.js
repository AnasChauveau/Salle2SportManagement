// Mock simple pour un store Pinia (exemple auth)
function useAuthStoreMock() {
  return {
    currentUser: { id: 1, firstname: 'John', lastname: 'Doe', role: 'ADMIN' },
    isAuthenticated: true,
    login: jest.fn(),
    logout: jest.fn(),
  };
}
module.exports = { useAuthStoreMock };
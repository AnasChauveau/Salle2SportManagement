// Factories pour générer des objets de test

function userFactory(overrides = {}) {
  return {
    id: 1,
    firstname: 'John',
    lastname: 'Doe',
    email: 'john@doe.com',
    role: 'USER',
    ...overrides,
  };
}

function classFactory(overrides = {}) {
  return {
    id: 1,
    title: 'Yoga',
    coach: 'Alice',
    datetime: new Date().toISOString(),
    duration: 60,
    capacity: 15,
    isCancelled: false,
    ...overrides,
  };
}

function bookingFactory(overrides = {}) {
  return {
    id: 1,
    userId: 1,
    classId: 1,
    status: 'CONFIRMED',
    ...overrides,
  };
}

module.exports = { userFactory, classFactory, bookingFactory };
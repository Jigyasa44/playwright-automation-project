export const loginData = {
  validUser: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
};

export const invalidLoginData = [
  {
    testName: 'incorrect password',
    username: 'standard_user',
    password: 'wrong_password',
  },
  {
    testName: 'incorrect username',
    username: 'wrong_user',
    password: 'secret_sauce',
  },
];
export const checkoutData = {
  firstName: 'Jigyasa',
  lastName: 'Sharma',
  postalCode: '110001',
};
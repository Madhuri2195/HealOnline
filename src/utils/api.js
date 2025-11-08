// Placeholder for API calls
export const api = {
  login: async (data) => { return { success: true, token: "abcd1234" }; },
  register: async (data) => { return { success: true }; },
  getAppointments: async () => { return []; },
  getMedicalRecords: async () => { return []; },
  createPrescription: async (data) => { return { success: true }; }
};

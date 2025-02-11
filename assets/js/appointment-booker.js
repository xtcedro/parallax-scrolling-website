export const API_BASE_URL = window.location.origin.includes('localhost')
  ? 'http://localhost:3000'
  : 'https://www.domingueztechsolutions.com';

// Function to handle form submission
export function submitAppointments() {
  document.getElementById('appointmentForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent page reload

    // Collect form data
    const formData = {
      name: document.getElementById('name').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      email: document.getElementById('email').value.trim(),
      service: document.getElementById('service').value.trim(),
      message: document.getElementById('message').value.trim(),
    };

    console.log('Collected Form Data:', formData);

    // Validate form data
    if (!formData.name || !formData.phone || !formData.email || !formData.service) {
      showResponseMessage('All fields are required.', 'error');
      return;
    }

    // Send data to backend
    try {
      const response = await fetch(`${API_BASE_URL}/api/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const message = await response.text();
      if (response.ok) {
        showResponseMessage(message || 'Appointment booked successfully!', 'success');
        document.getElementById('appointmentForm').reset();
      } else {
        showResponseMessage(`Error: ${message || 'Failed to book the appointment.'}`, 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      showResponseMessage('Failed to connect to the server.', 'error');
    }
  });
}

// Function to display response messages
export function showResponseMessage(message, type) {
  const responseMessage = document.getElementById('responseMessage');
  responseMessage.textContent = message;
  responseMessage.className = `response-message ${type}`;
  responseMessage.style.display = 'block';
}

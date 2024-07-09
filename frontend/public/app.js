async function register() {
	    const username = document.getElementById('reg-username').value;
	    const password = document.getElementById('reg-password').value;
	    const role = document.getElementById('role').value;
	    const email = document.getElementById('email').value;

	    try {
		            const response = await fetch('/register', {
				                method: 'POST',
				                headers: { 'Content-Type': 'application/json' },
				                body: JSON.stringify({ username, password, role, email })
				            });
		            const data = await response.json();
		            alert(data.message);
		        } catch (error) {
				        console.error('Registration failed:', error);
				        alert('Registration failed. Please try again.');
				    }
}

async function login() {
	    const username = document.getElementById('username').value;
	    const password = document.getElementById('password').value;

	    try {
		            const response = await fetch('/login', {
				                method: 'POST',
				                headers: { 'Content-Type': 'application/json' },
				                body: JSON.stringify({ username, password })
				            });
		            const data = await response.json();
		            if (data.auth) {
				                localStorage.setItem('token', data.token);
				                document.getElementById('login-register').style.display = 'none';
				                document.getElementById('dashboard').style.display = 'block';
				            } else {
						                alert('Login failed');
						            }
		        } catch (error) {
				        console.error('Login failed:', error);
				        alert('Login failed. Please try again.');
				    }
}





async function login() {
	    const username = document.getElementById('username').value;
	    const password = document.getElementById('password').value;

	    try {
		            const response = await fetch('/login', {
				                method: 'POST',
				                headers: { 'Content-Type': 'application/json' },
				                body: JSON.stringify({ username, password })
				            });
		            const data = await response.json();

		            if (response.ok) {
				                localStorage.setItem('token', data.token);
				                document.getElementById('login-register').style.display = 'none';
				                document.getElementById('dashboard').style.display = 'block';

				                await getBenchResources();
				            } else {
						                alert('Login failed: ' + data.message);
						            }
		        } catch (error) {
				        console.error('Login failed:', error);
				        alert('Login failed. Please try again.');
				    }
}


async function bookResource(id) {
	    const booked_by = 'some_user'; // Replace with actual logged-in user
	    const booked_company = 'some_company'; // Replace with actual logged-in user's company

	    try {
		            const response = await fetch(`/bench_resources/${id}/book`, {
				                method: 'PUT',
				                headers: {
							                'Content-Type': 'application/json',
							                'Authorization': 'Bearer ' + localStorage.getItem('token')
							            },
				                body: JSON.stringify({ booked_by, booked_company })
				            });
		            const data = await response.json();
		            alert(data.message);
		        } catch (error) {
				        console.error('Error booking resource:', error);
				        alert('Failed to book resource. Please try again.');
				    }
}


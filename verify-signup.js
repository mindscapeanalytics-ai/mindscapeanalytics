async function verify() {
    try {
        console.log("Testing Signup Endpoint...");
        const res = await fetch("http://localhost:3000/api/auth/sign-up/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Origin": "http://localhost:3000",
                "Referer": "http://localhost:3000/sign-up"
            },
            body: JSON.stringify({
                email: "finaltest@mindscape.com",
                password: "Password123!",
                name: "Final Test User",
                username: "finaltest_" + Date.now()
            })
        });
        const text = await res.text();
        console.log("Signup Status:", res.status);
        console.log("Signup Body:", text);

        if (res.status === 200) {
            console.log("SUCCESS: 422 Errors and 500 DB Timeouts are resolved!");
        } else if (res.status === 422) {
            console.log("ERROR: 422 Still persists!");
        }

    } catch (err) {
        console.error("Fetch error:", err.message);
    }
}
verify();

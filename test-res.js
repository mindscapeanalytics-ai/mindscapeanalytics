async function test() {
    try {
        const res = await fetch("http://localhost:3001/api/auth/sign-up/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Origin": "http://localhost:3001",
                "Referer": "http://localhost:3001/sign-up"
            },
            body: JSON.stringify({
                email: "test422@mindscape.com",
                password: "Password123!",
                name: "Test User",
                username: "testuser_" + Date.now()
            })
        });
        const text = await res.text();
        console.log("Status:", res.status);
        console.log("Body:", text);
    } catch (err) {
        console.error("Fetch error:", err.message);
    }
}
test();

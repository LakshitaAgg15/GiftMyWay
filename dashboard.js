function editProfile() {
    const name = prompt("Enter your new name:");
    const email = prompt("Enter your new email:");
    if (name && email) {
        document.querySelector("#profile p:nth-of-type(1)").innerHTML = `<strong>Name:</strong> ${name}`;
        document.querySelector("#profile p:nth-of-type(2)").innerHTML = `<strong>Email:</strong> ${email}`;
    }
}

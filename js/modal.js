document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.step'); // Žingsniai modalui
    const nextStepButtons = document.querySelectorAll('.next-step'); // Mygtukai, pereinantys į kitus žingsnius
    const confirmButton = document.querySelector('.confirm-btn'); // Patvirtinimo mygtukas
    const finishButton = document.querySelector('.finish-btn'); // Baigimo mygtukas
    const reservationModal = new bootstrap.Modal(document.getElementById('reservationModal')); // Modalas

    // Rodyti modalą ir pradėti rezervacijos procesą
    document.querySelectorAll('.reservation-btn').forEach(button => {
        button.addEventListener('click', () => {
            console.log("Modalas atidarytas"); // Debug pranešimas
            steps.forEach(step => {
                step.classList.remove('active'); // Paslėpti visus žingsnius
                step.classList.add('d-none'); // Užtikrinti, kad visi žingsniai paslėpti
            });
            steps[0].classList.add('active'); // Rodyti pirmą žingsnį
            steps[0].classList.remove('d-none'); // Pašalinti d-none, kad pirmas žingsnis būtų matomas
            reservationModal.show(); // Atidaryti modalą
        });
    });

    // Pereiti tarp žingsnių
    nextStepButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const stepNumber = event.target.getAttribute('data-step'); // Nuskaityti žingsnio numerį
            console.log(`Toliau paspausta, einame į žingsnį: ${stepNumber}`); // Debug pranešimas

            // Pašalinti 'active' klasę iš visų žingsnių ir paslėpti
            steps.forEach(step => {
                step.classList.remove('active');
                step.classList.add('d-none'); // Užtikrinti, kad visi žingsniai bus paslėpti
            });
            console.log("Visi žingsniai paslėpti"); // Debug pranešimas

            // Pridėti 'active' klasę prie pasirinkto žingsnio ir pašalinti 'd-none'
            const nextStep = document.querySelector(`.step-${stepNumber}`);
            if (nextStep) {
                nextStep.classList.add('active');
                nextStep.classList.remove('d-none'); // Pašalinti d-none, kad žingsnis būtų matomas
                console.log(`Žingsnis ${stepNumber} tapo aktyvus`); // Debug pranešimas
            } else {
                console.error(`Žingsnis ${stepNumber} nerastas`); // Debug klaida
            }

            // Jei pereiname į 2 žingsnį, užpildome laikų pasirinkimus
            if (stepNumber === '2') {
                const timeSelect = document.getElementById('reservationTime');
                timeSelect.innerHTML = ''; // Išvalyti laikų sąrašą
                for (let hour = 8; hour <= 20; hour++) {
                    timeSelect.innerHTML += `<option value="${hour}:00">${hour}:00</option>`; // Pridėti laikus
                }
                console.log("Laikų sąrašas užpildytas"); // Debug pranešimas
            }
        });
    });

    // Tikrinti vardą ir telefono numerį
    document.getElementById('reservationPhone').addEventListener('input', () => {
        const name = document.getElementById('reservationName').value;
        const phone = document.getElementById('reservationPhone').value;
        confirmButton.disabled = !(name && phone); // Įjungti "Patvirtinti" tik kai užpildyti visi laukeliai
        console.log("Vardas ir telefono numeris įvesti"); // Debug pranešimas
    });

    // Patvirtinti informaciją
    confirmButton.addEventListener('click', () => {
        alert('SMS su patvirtinimo kodu buvo išsiųsta!');
        steps.forEach(s => {
            s.classList.remove('active');
            s.classList.add('d-none'); // Paslėpti visus žingsnius
        });
        document.querySelector('.step-4').classList.add('active'); // Rodyti paskutinį žingsnį
        document.querySelector('.step-4').classList.remove('d-none'); // Pašalinti d-none
        console.log("Pereita į paskutinį žingsnį"); // Debug pranešimas
    });

    // Pabaigti rezervaciją
    finishButton.addEventListener('click', () => {
        const code = document.getElementById('verificationCode').value;
        if (code.length === 5) {
            alert('Rezervacija patvirtinta!');
            reservationModal.hide(); // Uždaryti modalą
        } else {
            alert('Neteisingas kodas!');
        }
    });
});

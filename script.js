document.querySelectorAll(".team").forEach(team => {
    team.addEventListener("mousemove", e => {
        const rect = team.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        team.style.background =
            `radial-gradient(circle at ${x}px ${y}px, rgba(255,70,85,.3), #161f3a)`;
    });

    team.addEventListener("mouseleave", () => {
        team.style.background = "linear-gradient(145deg,#202b4d,#161f3a)";
    });
});

document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("modalForm");
    const openBtn = document.getElementById("openForm");
    const closeBtn = document.querySelector(".close");
    const form = document.getElementById("contactForm");

    if (openBtn && modal) {
        openBtn.addEventListener("click", e => {
            e.preventDefault();
            modal.style.display = "flex";
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    if (modal) {
        window.addEventListener("click", e => {
            if (e.target === modal) modal.style.display = "none";
        });
    }

    if (form) {
        form.addEventListener("submit", e => {
            e.preventDefault();

            const inputs = [...form.querySelectorAll("input")];
            const values = inputs
                .map(i => i.value.trim().toLowerCase())
                .filter(v => v !== "");

            if (new Set(values).size !== values.length) {
                alert("❌ No se permiten nicks repetidos (incluido el reserva)");
                return;
            }

            emailjs.sendForm(
                "service_o6qtgnn",
                "template_bf5wxdw",
                form
            )
            .then(() => {
                alert("¡Inscripción enviada correctamente! ✅");

                form.reset();

                if (modal) modal.style.display = "none";

                setTimeout(() => {
                    window.location.href = "index.html";
                }, 800);
            })
            .catch(err => {
                console.error("Error EmailJS:", err);
                alert("Error al enviar la inscripción ❌");
            });
        });
    }
});

document.getElementById("viewLiveBtn")?.addEventListener("click", e => {
    e.preventDefault();
    document.getElementById("stream-section")?.scrollIntoView({
        behavior: "smooth"
    });
});
const tournamentDate = new Date("2026-01-18T17:00:00-05:00").getTime();

const countdown = setInterval(() => {
    const now = new Date().getTime();
    const distance = tournamentDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML = 
        `${days}d ${hours}h ${minutes}m ${seconds}s`;

    if (distance < 0) {
        clearInterval(countdown);
        document.getElementById("countdown").innerHTML = "¡El torneo ha comenzado!";
    }
}, 1000);
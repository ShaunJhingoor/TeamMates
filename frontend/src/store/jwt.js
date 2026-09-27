let csrfPromise = null;

async function restoreCSRF() {
  if (getCookie("CSRF-TOKEN")) return;

  if (!csrfPromise) {
    csrfPromise = fetch("/api/csrf/restore")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to restore CSRF token");
        }
        return res;
      })
      .finally(() => {
        csrfPromise = null;
      });
  }

  await csrfPromise;
}

async function jwtFetch(url, options = {}) {
  options.method = options.method || "GET";
  options.headers = options.headers || {};

  const jwtToken = localStorage.getItem("jwtToken");

  if (jwtToken) {
    options.headers["Authorization"] = "Bearer " + jwtToken;
  }

  if (options.method.toUpperCase() !== "GET") {
    await restoreCSRF();

    options.headers["Content-Type"] =
      options.headers["Content-Type"] || "application/json";

    options.headers["CSRF-Token"] = getCookie("CSRF-TOKEN");
  }

  const res = await fetch(url, options);

  if (res.status >= 400) throw res;

  return res;
}

function getCookie(cookieName) {
  const cookies = document.cookie.split(";");

  for (let cookie of cookies) {
    const [name, value] = cookie.split("=");

    if (name.trim() === cookieName) {
      return value;
    }
  }

  return null;
}

export default jwtFetch;

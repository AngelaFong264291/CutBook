const API_BASE_URL = "http://localhost:3001";

const createForm = document.getElementById("createForm");
const createNameInput = document.getElementById("createName");
const createCategoryInput = document.getElementById("createCategory");
const createPublishedInput = document.getElementById("createPublished");
const hairstylesList = document.getElementById("hairstylesList");
const statusMessage = document.getElementById("statusMessage");
const refreshButton = document.getElementById("refreshButton");

async function fetchHairstyles() {
  setStatus("Loading hairstyles...");

  const response = await fetch(`${API_BASE_URL}/hairstyles`);
  const hairstyles = await response.json();

  if (!response.ok) {
    throw new Error("Failed to load hairstyles.");
  }

  renderHairstyles(hairstyles);
  setStatus(`Loaded ${hairstyles.length} hairstyle records.`);
}

function setStatus(message) {
  statusMessage.textContent = message;
}

function renderHairstyles(hairstyles) {
  hairstylesList.innerHTML = "";

  if (hairstyles.length === 0) {
    hairstylesList.innerHTML = "<p>No hairstyles found yet.</p>";
    return;
  }

  hairstyles.forEach((hairstyle) => {
    const card = document.createElement("article");
    card.className = "card";

    const publishedClass = hairstyle.published ? "published" : "unpublished";
    const publishedLabel = hairstyle.published ? "Published" : "Unpublished";

    card.innerHTML = `
      <div class="card-header">
        <div>
          <div class="card-title">#${hairstyle.id} ${hairstyle.name}</div>
        </div>
        <span class="badge ${publishedClass}">${publishedLabel}</span>
      </div>

      <div class="card-grid">
        <label>
          <span>Name</span>
          <input type="text" value="${escapeHtml(hairstyle.name)}" data-field="name" />
        </label>

        <label>
          <span>Category</span>
          <input type="text" value="${escapeHtml(hairstyle.category)}" data-field="category" />
        </label>

        <label class="checkbox-row">
          <input type="checkbox" data-field="published" ${hairstyle.published ? "checked" : ""} />
          <span>Published</span>
        </label>
      </div>

      <div class="card-actions">
        <button class="secondary-button" data-action="save">Save Changes</button>
        <button class="secondary-button" data-action="toggle">
          ${hairstyle.published ? "Unpublish" : "Publish"}
        </button>
        <button class="danger-button" data-action="delete">Delete</button>
      </div>
    `;

    const nameInput = card.querySelector('[data-field="name"]');
    const categoryInput = card.querySelector('[data-field="category"]');
    const publishedInput = card.querySelector('[data-field="published"]');

    card.querySelector('[data-action="save"]').addEventListener("click", async () => {
      await updateHairstyle(hairstyle.id, {
        name: nameInput.value.trim(),
        category: categoryInput.value.trim(),
        published: publishedInput.checked,
      });
    });

    card.querySelector('[data-action="toggle"]').addEventListener("click", async () => {
      await togglePublish(hairstyle.id, !publishedInput.checked);
    });

    card.querySelector('[data-action="delete"]').addEventListener("click", async () => {
      const confirmed = window.confirm(`Delete hairstyle #${hairstyle.id} ${hairstyle.name}?`);

      if (!confirmed) {
        return;
      }

      await deleteHairstyle(hairstyle.id);
    });

    hairstylesList.appendChild(card);
  });
}

async function createHairstyle(event) {
  event.preventDefault();

  const payload = {
    name: createNameInput.value.trim(),
    category: createCategoryInput.value.trim(),
    published: createPublishedInput.checked,
  };

  const response = await fetch(`${API_BASE_URL}/hairstyles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to create hairstyle.");
  }

  createForm.reset();
  setStatus(`Created hairstyle #${data.id} ${data.name}.`);
  await fetchHairstyles();
}

async function updateHairstyle(id, payload) {
  const response = await fetch(`${API_BASE_URL}/hairstyles/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || `Failed to update hairstyle #${id}.`);
  }

  setStatus(`Updated hairstyle #${data.id}.`);
  await fetchHairstyles();
}

async function togglePublish(id, nextPublished) {
  const response = await fetch(`${API_BASE_URL}/hairstyles/${id}/publish`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      published: nextPublished,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || `Failed to toggle publish for hairstyle #${id}.`);
  }

  setStatus(
    `${nextPublished ? "Published" : "Unpublished"} hairstyle #${data.id} ${data.name}.`
  );
  await fetchHairstyles();
}

async function deleteHairstyle(id) {
  const response = await fetch(`${API_BASE_URL}/hairstyles/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || `Failed to delete hairstyle #${id}.`);
  }

  setStatus(`Deleted hairstyle #${id}.`);
  await fetchHairstyles();
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

createForm.addEventListener("submit", async (event) => {
  try {
    await createHairstyle(event);
  } catch (error) {
    console.error(error);
    setStatus(error.message);
  }
});

refreshButton.addEventListener("click", async () => {
  try {
    await fetchHairstyles();
  } catch (error) {
    console.error(error);
    setStatus(error.message);
  }
});

fetchHairstyles().catch((error) => {
  console.error(error);
  setStatus(error.message);
});

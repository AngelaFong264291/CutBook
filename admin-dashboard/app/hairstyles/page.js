import { createHairstyleCard } from "/components/hairstyle-card.js";
import {
  createHairstyle,
  deleteHairstyle,
  fetchHairstyles,
  togglePublish,
  updateHairstyle,
} from "/services/hairstyles-service.js";
import { setStatus } from "/lib/dom.js";

// Grab the main interactive elements for the hairstyles admin page.
const createForm = document.getElementById("createForm");
const createNameInput = document.getElementById("createName");
const createCategoryInput = document.getElementById("createCategory");
const createPublishedInput = document.getElementById("createPublished");
const hairstylesList = document.getElementById("hairstylesList");
const refreshButton = document.getElementById("refreshButton");

// Render all hairstyle records into the management list.
async function loadHairstyles() {
  setStatus("Loading hairstyles...");

  const hairstyles = await fetchHairstyles();
  hairstylesList.innerHTML = "";

  if (hairstyles.length === 0) {
    hairstylesList.innerHTML = "<p>No hairstyles found yet.</p>";
    setStatus("No hairstyles found.");
    return;
  }

  hairstyles.forEach((hairstyle) => {
    const card = createHairstyleCard(hairstyle, {
      onSave: async (payload) => {
        await updateHairstyle(hairstyle.id, payload);
        setStatus(`Updated hairstyle #${hairstyle.id}.`);
        await loadHairstyles();
      },
      onToggle: async (nextPublished) => {
        const updated = await togglePublish(hairstyle.id, nextPublished);
        setStatus(
          `${nextPublished ? "Published" : "Unpublished"} hairstyle #${updated.id} ${updated.name}.`
        );
        await loadHairstyles();
      },
      onDelete: async () => {
        await deleteHairstyle(hairstyle.id);
        setStatus(`Deleted hairstyle #${hairstyle.id}.`);
        await loadHairstyles();
      },
    });

    hairstylesList.appendChild(card);
  });

  setStatus(`Loaded ${hairstyles.length} hairstyle records.`);
}

// Submit the create form and then reload the list.
createForm.addEventListener("submit", async (event) => {
  try {
    event.preventDefault();

    const newHairstyle = await createHairstyle({
      name: createNameInput.value.trim(),
      category: createCategoryInput.value.trim(),
      published: createPublishedInput.checked,
    });

    createForm.reset();
    setStatus(`Created hairstyle #${newHairstyle.id} ${newHairstyle.name}.`);
    await loadHairstyles();
  } catch (error) {
    console.error(error);
    setStatus(error.message);
  }
});

// Let the admin refresh the latest records manually.
refreshButton.addEventListener("click", async () => {
  try {
    await loadHairstyles();
  } catch (error) {
    console.error(error);
    setStatus(error.message);
  }
});

loadHairstyles().catch((error) => {
  console.error(error);
  setStatus(error.message);
});

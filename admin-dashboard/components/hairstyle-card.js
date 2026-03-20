import { escapeHtml } from "/lib/dom.js";

// Build one editable hairstyle card for the admin list.
export function createHairstyleCard(hairstyle, handlers) {
  const card = document.createElement("article");
  card.className = "card";

  const publishedClass = hairstyle.published ? "published" : "unpublished";
  const publishedLabel = hairstyle.published ? "Published" : "Unpublished";

  card.innerHTML = `
    <div class="card-header">
      <div>
        <div class="card-title">#${hairstyle.id} ${escapeHtml(hairstyle.name)}</div>
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
    await handlers.onSave({
      name: nameInput.value.trim(),
      category: categoryInput.value.trim(),
      published: publishedInput.checked,
    });
  });

  card.querySelector('[data-action="toggle"]').addEventListener("click", async () => {
    await handlers.onToggle(!publishedInput.checked);
  });

  card.querySelector('[data-action="delete"]').addEventListener("click", async () => {
    const confirmed = window.confirm(`Delete hairstyle #${hairstyle.id} ${hairstyle.name}?`);

    if (!confirmed) {
      return;
    }

    await handlers.onDelete();
  });

  return card;
}

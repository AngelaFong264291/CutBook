import { API_BASE_URL } from "/lib/config.js";

// Fetch every hairstyle record for the admin dashboard.
export async function fetchHairstyles() {
  const response = await fetch(`${API_BASE_URL}/hairstyles`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to load hairstyles.");
  }

  return data;
}

// Create a new hairstyle record.
export async function createHairstyle(payload) {
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

  return data;
}

// Update all editable fields for one hairstyle.
export async function updateHairstyle(id, payload) {
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

  return data;
}

// Toggle only the publish state of one hairstyle.
export async function togglePublish(id, published) {
  const response = await fetch(`${API_BASE_URL}/hairstyles/${id}/publish`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ published }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || `Failed to toggle publish for hairstyle #${id}.`);
  }

  return data;
}

// Delete one hairstyle record.
export async function deleteHairstyle(id) {
  const response = await fetch(`${API_BASE_URL}/hairstyles/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || `Failed to delete hairstyle #${id}.`);
  }

  return data;
}

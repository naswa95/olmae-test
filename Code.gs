/*
 * Ce script doit être créé directement depuis le Google Sheets :
 * Extensions > Apps Script
 *
 * Aucun identifiant Google Sheets n’est nécessaire.
 */

const SHEET_NAME = "Réponses";

function doGet() {
  return createJsonResponse({
    success: true,
    message: "Le service Olmaé fonctionne."
  });
}

function doPost(e) {
  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);

    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("Aucune donnée reçue.");
    }

    if (e.postData.contents.length > 3000) {
      throw new Error("Requête trop volumineuse.");
    }

    const data = JSON.parse(e.postData.contents);

    // Champ anti-robot invisible.
    if (data.website) {
      throw new Error("Soumission refusée.");
    }

    const nom = cleanText(data.nom, 80);
    const prenom = cleanText(data.prenom, 80);
    const age = Number(data.age);

    if (!nom) {
      throw new Error("Le nom est obligatoire.");
    }

    if (!prenom) {
      throw new Error("Le prénom est obligatoire.");
    }

    if (!Number.isInteger(age) || age < 18 || age > 100) {
      throw new Error("L’âge doit être compris entre 18 et 100.");
    }

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);

    if (!sheet) {
      throw new Error('L’onglet "' + SHEET_NAME + '" est introuvable.');
    }

    sheet.appendRow([
      new Date(),
      nom,
      prenom,
      age
    ]);

    SpreadsheetApp.flush();

    return createJsonResponse({
      success: true,
      message: "Réponse enregistrée."
    });

  } catch (error) {
    console.error(error);

    return createJsonResponse({
      success: false,
      message: error.message || "Erreur inconnue."
    });

  } finally {
    try {
      lock.releaseLock();
    } catch (error) {
      console.error(error);
    }
  }
}

function testGoogleSheets() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    throw new Error('L’onglet "' + SHEET_NAME + '" est introuvable.');
  }

  sheet.appendRow([
    new Date(),
    "Martin",
    "Léa",
    30
  ]);

  SpreadsheetApp.flush();
  console.log("Ligne de test ajoutée.");
}

function cleanText(value, maxLength) {
  if (value === undefined || value === null) {
    return "";
  }

  let text = String(value)
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, maxLength);

  // Évite qu’un texte soit interprété comme une formule Sheets.
  if (/^[=+\-@]/.test(text)) {
    text = "'" + text;
  }

  return text;
}

function createJsonResponse(content) {
  return ContentService
    .createTextOutput(JSON.stringify(content))
    .setMimeType(ContentService.MimeType.JSON);
}

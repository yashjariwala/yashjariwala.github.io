const SHEET_ID = "1MUZpVAK14VM___35fBGm3DWUVn0TRIdvsB7SDGeOTvo";
const SHEET_NAME = "FamilyStayGuests";
const DRIVE_FOLDER_ID = "1AZeIQXcCCUCIegEE-eVi-cCUIU6YBXhl";

function doGet() {
  return jsonResponse({
    ok: true,
    message: "Family stay intake endpoint is online.",
  });
}

function doPost(e) {
  try {
    if (!e.postData || !e.postData.contents) {
      throw new Error("Missing request body.");
    }

    const payload = JSON.parse(e.postData.contents);
    validatePayload(payload);

    const sheet = getSheet();
    const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
    const fileName = buildFileName(payload);
    const fileBlob = Utilities.newBlob(
      Utilities.base64Decode(payload.aadhaarBase64),
      payload.fileMimeType,
      fileName
    );
    const file = folder.createFile(fileBlob);

    sheet.appendRow([
      new Date(),
      payload.firstName,
      payload.lastName,
      payload.phone || "",
      payload.email || "",
      payload.notes || "",
      payload.sourcePage || "",
      payload.fileName,
      payload.fileMimeType,
      payload.fileSize || "",
      file.getName(),
      file.getId(),
      file.getUrl(),
      payload.submittedAt || "",
    ]);

    return jsonResponse({
      ok: true,
      fileId: file.getId(),
      fileUrl: file.getUrl(),
    });
  } catch (error) {
    return jsonResponse({
      ok: false,
      error: error.message || "Unable to save submission.",
    });
  }
}

function getSheet() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "timestamp",
      "first_name",
      "last_name",
      "phone",
      "email",
      "notes",
      "source_page",
      "original_file_name",
      "file_mime_type",
      "file_size_bytes",
      "drive_file_name",
      "drive_file_id",
      "drive_file_url",
      "submitted_at_iso",
    ]);
  }

  return sheet;
}

function validatePayload(payload) {
  if (!payload.firstName || !payload.lastName) {
    throw new Error("First name and last name are required.");
  }

  if (!payload.aadhaarBase64 || !payload.fileName || !payload.fileMimeType) {
    throw new Error("Aadhaar upload is required.");
  }

  if (!payload.consent) {
    throw new Error("Consent is required.");
  }
}

function buildFileName(payload) {
  const safeFirst = sanitizePart(payload.firstName);
  const safeLast = sanitizePart(payload.lastName);
  const extension = extractExtension(payload.fileName);
  const timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyyMMdd-HHmmss");

  return safeFirst + "-" + safeLast + "-" + timestamp + extension;
}

function sanitizePart(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "guest";
}

function extractExtension(fileName) {
  const match = String(fileName || "").match(/\.[a-zA-Z0-9]+$/);
  return match ? match[0].toLowerCase() : "";
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

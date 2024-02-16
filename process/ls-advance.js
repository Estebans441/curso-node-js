const fs = require("node:fs/promises");
const path = require("node:path");
const pc = require("picocolors");

const folder = process.argv[2] ?? "./";

async function ls(directory) {
  let files;
  try {
    files = await fs.readdir(directory);
  } catch (err) {
    console.error(pc.red("Error reading directory"));
    process.exit(1);
  }

  const filesPromises = files.map(async (file) => {
    const filePath = path.join(directory, file);
    let stats;
    try {
      stats = await fs.stat(filePath);
    } catch (err) {
      console.error(pc.red("Error reading file"));
      process.exit(1);
    }

    const isDirectory = stats.isDirectory();
    const fileType = isDirectory ? "directory" : "file";
    const fileSize = stats.size.toString();
    const fileModified = stats.mtime.toLocaleDateString();
    return `${fileType} ${pc.blue(file.padEnd(20))} ${pc.green(fileSize)} ${pc.yellow(fileModified)}`;
  });

  const filesInfo = await Promise.all(filesPromises);
  filesInfo.forEach((fileInfo) => {
    console.log(fileInfo);
  });
}

ls(folder);

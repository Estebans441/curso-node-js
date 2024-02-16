const fs = require("node:fs/promises");
const path = require("node:path");
<<<<<<< HEAD
const pc = require("picocolors");
=======
>>>>>>> a2f2a6e79a56fdef6e3bb50b039cc73b95cbb97a

const folder = process.argv[2] ?? "./";

async function ls(directory) {
  let files;
  try {
    files = await fs.readdir(directory);
  } catch (err) {
<<<<<<< HEAD
    console.error(pc.red("Error reading directory"));
=======
    console.error(err, "Error reading directory");
>>>>>>> a2f2a6e79a56fdef6e3bb50b039cc73b95cbb97a
    process.exit(1);
  }

  const filesPromises = files.map(async (file) => {
    const filePath = path.join(directory, file);
    let stats;
    try {
      stats = await fs.stat(filePath);
    } catch (err) {
<<<<<<< HEAD
      console.error(pc.red("Error reading file"));
=======
      console.error(err, "Error reading file stats");
>>>>>>> a2f2a6e79a56fdef6e3bb50b039cc73b95cbb97a
      process.exit(1);
    }

    const isDirectory = stats.isDirectory();
    const fileType = isDirectory ? "directory" : "file";
    const fileSize = stats.size.toString();
    const fileModified = stats.mtime.toLocaleDateString();

<<<<<<< HEAD
    return `${fileType} ${pc.blue(file.padEnd(20))} ${pc.green(fileSize)} ${pc.yellow(fileModified)}`;
=======
    return `${fileType} ${file.padEnd(20)} ${fileSize} ${fileModified}`;
>>>>>>> a2f2a6e79a56fdef6e3bb50b039cc73b95cbb97a
  });

  const filesInfo = await Promise.all(filesPromises);
  filesInfo.forEach((fileInfo) => {
    console.log(fileInfo);
  });
}

ls(folder);

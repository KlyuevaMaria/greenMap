const {
  Document,
  Photo,
  Tree,
  Status,
  Special_note,
  Environment,
  Condition,
} = require("../models/treeModels");
const uuid = require("uuid");
const path = require("path");
const { User } = require("../models/userModels");

class TreeController {
  async createTree(req, res, next) {
    try {
      const {
        type,
        status,
        note,
        latitude,
        longitude,
        adress,
        owner,
        env,
        year,
        height,
        diameter,
        num_of_bar,
        crown_diameter,
        condition,
      } = req.body;

      // проверка наличия файлов
      if (!req.files || !req.files.photo || !req.files.document) {
        return res.status(400).json({ message: "Файлы не были загружены." });
      }

      // загрузка и проверка типа, размера фото
      const { photo } = req.files;

      const allowedPhotoTypes = ["image/jpeg", "image/png"];
      const maxPhotoSize = 5 * 1024 * 1024; // 5 MB

      if (!allowedPhotoTypes.includes(photo.mimetype)) {
        return res
          .status(400)
          .json({ message: "Недопустимый тип файла для фото." });
      }

      if (photo.size > maxPhotoSize) {
        return res
          .status(400)
          .json({ message: "Размер фото превышает допустимый лимит." });
      }

      let photoName = uuid.v4() + ".jpg";
      photo.mv(path.resolve(__dirname, "..", "static/photo", photoName));

      const photoTree = await Photo.create({
        name: photoName,
      });

      // загрузка и проверка типа, размера докуметов
      const { document } = req.files;
      const originalDocName = document.name;
      const docExt = path.extname(originalDocName);
      const allowedDocTypes = [
        "text/plain",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]; 
      const maxDocSize = 2 * 1024 * 1024; // 2 MB

      if (!allowedDocTypes.includes(document.mimetype)) {
        return res
          .status(400)
          .json({ message: "Недопустимый тип файла для документа." });
      }

      if (document.size > maxDocSize) {
        return res
          .status(400)
          .json({ message: "Размер документа превышает допустимый лимит." });
      }

      let docName = uuid.v4() + docExt;
      document.mv(path.resolve(__dirname, "..", "static/documents", docName));

      const docTree = await Document.create({
        name: docName,
      });

      const isStatus = await Status.findOne({
        where: { status_name: status },
      });

      const isNote = await Special_note.findOne({
        where: { note: note },
      });

      const isEnv = await Environment.findOne({
        where: { name: env },
      });

      const isCondition = await Condition.findOne({
        where: { name: condition },
      });
      console.log(
        "-------------",
        isCondition.id,
        isNote.id,
        isStatus.id,
        isEnv.id
      );

      const tree = await Tree.create({
        type,
        statusId: isStatus.id,
        specialNoteId: isNote.id,
        latitude,
        longitude,
        adress,
        owner,
        environmentId: isEnv.id,
        year_of_planting: year,
        height,
        diameter,
        number_of_barrels: num_of_bar,
        crown_diameter,
        conditionId: isCondition.id,
        documentId: docTree.id,
        photoId: photoTree.id,
      });

      return res.json({ message: `Дерево ${type} успешно добавлено` });
    } catch (e) {
      next(console.log(e.message));
    }
  }

  async createStatus(req, res, next) {
    try {
      const { status_name } = req.body;
      const status = await Status.create({
        status_name,
      });
      console.log("-------------", status_name);
      return res.json({ message: `Добавлен статус - ${status_name}` });
    } catch (e) {
      next(console.log(e.message));
    }
  }
  async createSpecialNote(req, res, next) {
    try {
      const { note } = req.body;
      const addedNote = await Special_note.create({
        note,
      });
      console.log("-------------", note);
      return res.json({ message: `Добавлена особая пометка - ${note}` });
    } catch (e) {
      next(console.log(e.message));
    }
  }
  async createEnv(req, res, next) {
    try {
      const { name } = req.body;
      const env = await Environment.create({
        name,
      });
      console.log("-------------", name);
      return res.json({ message: `Добавлена среда произрастания - ${name}` });
    } catch (e) {
      next(console.log(e.message));
    }
  }
  async createCondition(req, res, next) {
    try {
      const { name } = req.body;
      const condition = await Condition.create({
        name,
      });
      console.log("-------------", name);
      return res.json({ message: `Добавлено новое состояние - ${name}` });
    } catch (e) {
      next(console.log(e.message));
    }
  }


}

module.exports = new TreeController();

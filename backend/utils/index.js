// "Utils", "utilities" (yardımcılar) kelimesinin kısaltmasıdır.
// Genellikle tekrar eden veya genel amaçlı kullanılan helper functions burada tanımlanır.

import mongoose from "mongoose";

/*
JavaScript'te "truthy" ve "falsy" değerler, bir değişkenin boolean olarak nasıl değerlendirileceğini belirtir.

Falsy olan değerler:
- false
- 0
- "" (boş string)
- null
- undefined
- NaN

Bunlar dışındaki tüm değerler truthy'dir.
*/

// isValidObjectId Gelen id'nin MongoDB ObjectId formatında olup olmadığını kontrol eder.
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const findDocumentById = async (model, id) => {
  try {
    // findById(id), MongoDB’de "_id" alanı "id" ile eşleşen ilk document’ı bulmaya çalışır. Bulunamazsa null döner.
    const document = await model.findById(id);
    if (document != null) {
      // Belge bulunduysa döndür.
      return document;
    } else {
      // Belge bulunamadıysa null döndür.
      return document;
    }
  } catch (error) {
    throw new Error(
      `Database error while finding ${model.modelName}: ${error.message}`
    );
  }
};

/*
checkValidationError(), Mongoose tarafından fırlatılan doğrulama hatalarını (ValidationError) JSON formatında döndürür.
*/
const checkValidationError = (error) => {
  // Boş bir object oluşturuyoruz. Hataları bu nesnenin içine kaydedeceğiz.
  const validationErrors = {};

  // error.errors, içinde hangi alanların (title, author) hatalı olduğu bilgisini saklar.
  for (let field in error.errors) {
  /*
  Not: Aşağıdaki örnekte her bir key (örneğin: "title", "author"), hatalı alanın adıdır. for...in döngüsüyle bu alan adlarını (field) sırayla alırız.

  ***********************************************
  Eğer Mongoose doğrulama hataları şu şekildeyse:
  ***********************************************
  {
    "errors": {
      "title": {
        "message": "Title is required"
      },
      "author": {
        "message": "Author must be at least 3 characters"
      }
    }
  }

  *************************
  Döngü şu şekilde çalışır:
  *************************

  field = "title"
  validationErrors["title"] = "Title is required";

  Şimdi validationErrors şu hale geldi:
  {
    "title": "Title is required"
  }

  field = "author"
  validationErrors["author"] = "Author must be at least 3 characters";

  *************************************
  Şimdi validationErrors şu hale geldi:
  *************************************
  {
    "title": "Title is required",
    "author": "Author must be at least 3 characters"
  }
  */
    validationErrors[field] = error.errors[field].message;
  }

  return {
    error: "Validation error",
    validationErrors,
  };
};

export { isValidObjectId, findDocumentById, checkValidationError };

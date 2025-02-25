"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationUtils = void 0;
const express_validator_1 = require("express-validator");
class ValidationUtils {
    static validate(validations) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(validations.map(validation => validation.run(req)));
            const errors = express_validator_1.validationResult(req);
            if (errors.isEmpty()) {
                return next();
            }
            const response = errors.array().map(e => {
                return {
                    location: e.location,
                    field: e.param,
                    errorMessage: e.msg
                };
            });
            res.status(400).json(response);
        });
    }
}
exports.ValidationUtils = ValidationUtils;
//# sourceMappingURL=validation-utils.js.map
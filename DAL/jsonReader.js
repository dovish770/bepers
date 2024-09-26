var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jsonfile from 'jsonfile';
export const writeFileToUserJson = (beeper) => __awaiter(void 0, void 0, void 0, function* () {
    jsonfile.readFile('./data/db.json')
        .then(beepers => {
        beepers.push(beeper);
        jsonfile.writeFile('./data/db.json', beepers, function (err) {
            if (err)
                console.error(err);
        });
    })
        .catch(error => console.error(error));
});
export const getBeepersFromJson = () => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield jsonfile.readFile('./data/db.json');
    if (!beepers || beepers.length === 0) {
        return null;
    }
    return beepers;
});

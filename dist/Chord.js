"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isChord = exports.Chord = exports.MINOR_PATTERN = exports.ROOT_PATTERN = exports.CHORD_RANKS = void 0;
/**
 * The rank for each possible chord. Rank is the distance in semitones from C.
 */
exports.CHORD_RANKS = new Map([
    ["B#", 0],
    ["C", 0],
    ["C#", 1],
    ["Db", 1],
    ["D", 2],
    ["D#", 3],
    ["Eb", 3],
    ["E", 4],
    ["Fb", 4],
    ["E#", 5],
    ["F", 5],
    ["F#", 6],
    ["Gb", 6],
    ["G", 7],
    ["G#", 8],
    ["Ab", 8],
    ["A", 9],
    ["A#", 10],
    ["Bb", 10],
    ["Cb", 11],
    ["B", 11],
]);
// Regex for recognizing chords
const TRIAD_PATTERN = "(M|maj|major|m|min|minor|dim|sus|dom|aug|\\+|-)";
const ADDED_TONE_PATTERN = "(\\(?([/\\.\\+]|add)?[#b]?\\d+[\\+-]?\\)?)";
const SUFFIX_PATTERN = `(?<suffix>\\(?${TRIAD_PATTERN}?${ADDED_TONE_PATTERN}*\\)?)`;
const BASS_PATTERN = "(\\/(?<bass>[A-G](#|b)?))?";
exports.ROOT_PATTERN = "(?<root>[A-G](#|b)?)";
exports.MINOR_PATTERN = "(m|min|minor)+";
const CHORD_REGEX = new RegExp(`^${exports.ROOT_PATTERN}${SUFFIX_PATTERN}${BASS_PATTERN}$`);
const MINOR_SUFFIX_REGEX = new RegExp(`^${exports.MINOR_PATTERN}.*$`);
/**
 * Represents a musical chord. For example, Am7/C would have:
 *
 * root: A
 * suffix: m7
 * bass: C
 */
class Chord {
    constructor(root, suffix, bass) {
        this.root = root;
        this.suffix = suffix;
        this.bass = bass;
    }
    toString() {
        if (this.bass) {
            return this.root + this.suffix + "/" + this.bass;
        }
        else {
            return this.root + this.suffix;
        }
    }
    isMinor() {
        // @ts-expect-error Missing type definition for MINOR_SUFFIX_REGEX.
        return MINOR_SUFFIX_REGEX.test(this.suffix);
    }
    static parse(token) {
        if (!isChord(token)) {
            throw new Error(`${token} is not a valid chord`);
        }
        const regex = new RegExp(CHORD_REGEX);
        const result = regex.exec(token);
        // const result = XRegExp.exec(token, CHORD_REGEX);
        // @ts-expect-error é necessário verificar se result é null.
        return new Chord(result.root, result.suffix, result.bass);
    }
}
exports.Chord = Chord;
function isChord(token) {
    return CHORD_REGEX.test(token);
}
exports.isChord = isChord;

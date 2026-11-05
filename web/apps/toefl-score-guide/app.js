/* TOEFL Score Guide: the 1 to 6 band scale, its CEFR levels, and the scores your universities ask for. */
(function () {
  'use strict';
  const KEY = 'toefl-score-guide.targets';
  // ETS describes the 1 to 6 scale as aligned with the CEFR. Half bands sit between levels.
  const BANDS = [[6, 'C2', 'Mastery: understands virtually everything; expresses ideas precisely and fluently.'], [5, 'C1', 'Advanced: handles demanding academic material and speaks and writes flexibly.'], [4, 'B2', 'Upper intermediate: follows lectures on familiar topics; argues a point clearly.'], [3, 'B1', 'Intermediate: copes with everyday and simple academic tasks.'], [2, 'A2', 'Elementary: handles short, routine exchanges.'], [1, 'A1', 'Beginner: understands and uses familiar everyday phrases.']];
  const cefr = (band) => { const b = Math.floor(band); const row = BANDS.find((x) => x[0] === Math.max(1, Math.min(6, b))); return row[1] + (band % 1 ? ' to ' + (BANDS.find((x) => x[0] === Math.min(6, b + 1)) || row)[1] : ''); };
  const App = {
    about: 'Since January 2026 the TOEFL iBT reports each skill and the overall score on a 1 to 6 scale in half bands, aligned with the CEFR levels A1 to C2. For a transition period, score reports also show a comparable score on the older 0 to 120 scale. This guide explains the bands and keeps a list of the scores your universities require, with a check against your latest scores.',
    how: ['Read **Bands** to see what each level means.', 'Add each program\'s minimum scores in **My targets**, from the program\'s own website.', 'Use ETS\'s official tables to compare 1 to 6 and 0 to 120 scores; this app does not guess a conversion.'],
    tabs: [
      { id: 'bands', label: 'Bands', render(el) { el.appendChild(SK.card('The 1 to 6 scale', SK.table(['Band', 'CEFR level', 'What it means'], BANDS, false), SK.note('Half bands, such as 4.5, fall between two levels. Check ets.org for the official band descriptions and the comparable 0 to 120 scores.'))); } },
      { id: 'targets', label: 'My targets', render(el) {
        const rows = SK.store.get(KEY, []);
        const inp = {};
        const f = (k, label, w, type) => SK.field(label, (inp[k] = SK.h('input', { type: type || 'text', style: { width: w || '14ch' }, step: type === 'number' ? 0.5 : null, min: type === 'number' ? 1 : null, max: type === 'number' ? 6 : null })));
        const msg = SK.h('div', {});
        el.appendChild(SK.card('Add a program', SK.h('div', { class: 'sk-row' }, f('program', 'Program', '22ch'), f('overall', 'Overall', '7ch', 'number'), f('reading', 'Reading', '7ch', 'number'), f('listening', 'Listening', '7ch', 'number'), f('writing', 'Writing', '7ch', 'number'), f('speaking', 'Speaking', '7ch', 'number')),
          SK.h('div', { style: { marginTop: '10px' } }, SK.btn('Add', () => {
            const r = { program: inp.program.value.trim() };
            if (!r.program) { SK.clear(msg).appendChild(SK.note('Enter the program name.', 'wrong')); return; }
            for (const k of ['overall', 'reading', 'listening', 'writing', 'speaking']) { if (inp[k].value === '') continue; const v = Number(inp[k].value); if (!(v >= 1 && v <= 6 && (v * 2) % 1 === 0)) { SK.clear(msg).appendChild(SK.note(k + ' must be 1 to 6 in half bands.', 'wrong')); return; } r[k] = v; }
            rows.push(r); SK.store.set(KEY, rows); SK.show('targets');
          })), msg));
        const latest = (SK.store.get('toefl-score-tracker.scores', []).slice(-1)[0]) || null;
        const gap = (r, k) => (r[k] === undefined ? '' : r[k] + (latest && latest[k] !== undefined ? (latest[k] >= r[k] ? ' ✓' : ' (need ' + SK.round(r[k] - latest[k], 1) + ' more)') : ''));
        el.appendChild(SK.card('Programs', rows.length ? SK.table(['Program', 'Overall', 'Reading', 'Listening', 'Writing', 'Speaking'], rows.map((r) => [r.program].concat(['overall', 'reading', 'listening', 'writing', 'speaking'].map((k) => gap(r, k))))) : SK.h('p', { class: 'sk-muted', text: 'No programs yet.' }),
          latest ? SK.h('p', { class: 'sk-small sk-muted', text: 'Compared with your latest scores in the TOEFL Score Tracker (' + latest.day + ').' }) : SK.h('p', { class: 'sk-small sk-muted', text: 'Log scores in the TOEFL Score Tracker app to see the gaps here.' }),
          rows.length ? SK.confirmTwice(SK.btn('Remove the last program', null, 'ghost small'), 'Remove the last program', () => { rows.pop(); SK.store.set(KEY, rows); SK.show('targets'); }) : null));
      } },
    ],
    BANDS, cefr,
    checks: { 'bands map to CEFR levels in order': (data, assert) => { assert.equal(cefr(6), 'C2'); assert.equal(cefr(4), 'B2'); assert.equal(cefr(4.5), 'B2 to C1'); assert.equal(cefr(1), 'A1'); assert.deepEqual(BANDS.map((b) => b[0]), [6, 5, 4, 3, 2, 1]); } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();

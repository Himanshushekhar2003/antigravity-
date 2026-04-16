import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('App UI Structure', () => {
  let dom;
  let document;

  beforeEach(() => {
    // Read the actual index.html to test against
    const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    dom = new JSDOM(html);
    document = dom.window.document;
  });

  it('should have the sidebar and main canvas area', () => {
    expect(document.querySelector('.sidebar')).not.toBeNull();
    expect(document.querySelector('.document-container')).not.toBeNull();
  });

  it('should have a template switcher button', () => {
    expect(document.getElementById('btn-template')).not.toBeNull();
  });
});

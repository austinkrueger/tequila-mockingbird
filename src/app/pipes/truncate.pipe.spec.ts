import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  it('create an instance', () => {
    const pipe = new TruncatePipe();
    expect(pipe).toBeTruthy();
  });

  it('should truncate the end of a string', () => {
    const pipe = new TruncatePipe();
    const testString = '1234567890abcdefghijklmnop';
    expect(pipe.transform(testString, ['20']).length).toBeLessThan(
      testString.length
    );
  });

  it('should replace the end of a string with ...', () => {
    const pipe = new TruncatePipe();
    const newString = pipe.transform('1234567890abcdefghij123', ['20']);
    expect(newString).toContain('...');
  });

  it('should replace the end of a string with a user entered string', () => {
    const pipe = new TruncatePipe();
    const newString = pipe.transform('1234567890abcdefghij123', ['20', '&&&']);
    expect(newString).toContain('&&&');
  });
});

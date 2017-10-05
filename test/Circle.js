import Circle from '../src/Circle';

describe('A circle', () => {
    it('can be created from an object', () => {
        const source = {
            a: {
                x: 100,
                y: 200,
            },
            r: 300,
        };

        const circle = Circle.fromObject(source);

        expect(circle.a.x).to.equal(100);
        expect(circle.a.y).to.equal(200);
        expect(circle.r).to.equal(300);
    });
    it('can be created from an array', () => {
        const source = [[100, 200], 300];

        const circle = Circle.fromArray(source);

        expect(circle.a.x).to.equal(100);
        expect(circle.a.y).to.equal(200);
        expect(circle.r).to.equal(300);
    });
});

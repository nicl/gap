import GapAB from './gap-ab';
import { defaultHelpers } from '../gap-core/gap-core';

describe('gap-ab', () => {
    it('should select variant if opted in', async () => {
        document.body.innerHTML = `
<gap-ab id='test' data-flag='experimentFoo'>
    <template data-variant>foo</template>
    <template data-control>bar</template>
</gap-ab>`;

        const el = document.getElementById('test');

        if (el === null) {
            fail();
            return;
        }

        await GapAB.do(el as Element, defaultHelpers);
        expect(el.innerHTML).toBe('bar');
    });

    it('should select variant if opted in', async () => {
        document.cookie = 'experimentFoo=true';

        document.body.innerHTML = `
<gap-ab id='test' data-flag='experimentFoo'>
    <template data-variant>foo</template>
    <template data-control>bar</template>
</gap-ab>`;

        const el = document.getElementById('test');

        if (el === null) {
            fail();
            return;
        }

        await GapAB.do(el as Element, defaultHelpers);
        expect(el.innerHTML).toBe('foo');
    });    
});
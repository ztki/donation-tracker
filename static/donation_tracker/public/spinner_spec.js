import Spinner from './spinner';
import React from 'react';
import addons from 'react/addons';
const { TestUtils } = React.addons;
import 'karma-jasmine';

describe('Spinner', () => {
    let subject;

    beforeEach(() => {
        window.STATIC_URL = '//localhost/static/';
    });

    describe('when spinning is true and imageFile is provided', () => {
        beforeEach(() => {
            subject = render({spinning: true, imageFile: 'foo.png'}, [<hr key='0'/>]);
        });

        it('renders an img', () => {
            expect(TestUtils.findRenderedDOMComponentWithTag(subject, 'img')).toBeDefined();
        });

        it('uses the imageFile', () => {
            expect(TestUtils.findRenderedDOMComponentWithTag(subject, 'img').getDOMNode().getAttribute('src')).toEqual('//localhost/static/foo.png');
        });

        it('does not render children', () => {
            expect(TestUtils.scryRenderedDOMComponentsWithTag(subject, 'hr').length).toBe(0);
        });
    });

    describe('when spinning is false', () => {
        beforeEach(() => {
            subject = render({spinning: false}, [<hr key='0'/>]);
        });

        it('does not render an img', () => {
            expect(TestUtils.scryRenderedDOMComponentsWithTag(subject, 'img').length).toBe(0);
        });

        it('renders children', () => {
            expect(TestUtils.findRenderedDOMComponentWithTag(subject, 'hr')).toBeDefined();
        });
    });

    function render(props = {}, children = []) {
        return TestUtils.renderIntoDocument(<Spinner {...props}>{children}</Spinner>);
    }
});

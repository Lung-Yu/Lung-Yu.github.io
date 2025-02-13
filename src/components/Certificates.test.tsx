import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Certificates from './Certificates';
import certificateData from '../data/certificateData';

describe('Certificates Component', () => {
    it('should open modal when an even-indexed certificate image is clicked and then the second image is clicked', () => {
        const openModal = vi.fn();
        render(<Certificates openModal={openModal} />);

        // Click on the first even-indexed certificate image
        const evenIndexedImages = screen.getAllByRole('img').filter((_: HTMLElement, index: number) => index % 2 === 0);
        fireEvent.click(evenIndexedImages[0]);

        // Click on the second image
        const secondImage = screen.getAllByRole('img')[1];
        fireEvent.click(secondImage);

        // Check if openModal was called with the correct image source
        expect(openModal).toHaveBeenCalledWith(certificateData[1].image);
    });
});
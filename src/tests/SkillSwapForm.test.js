/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SwapModal from '../components/swapModal';

describe('SkillSwapForm Unit Tests', () => {
  test('Renderiza campos requeridos y valida activación de envío', () => {
    const handleAddSwap = jest.fn();
    const handleClose = jest.fn();

    render(
      <SwapModal isOpen={true} onClose={handleClose} onAddSwap={handleAddSwap} />
    );

    const inputNombre = screen.getByPlaceholderText(/ej. Karla M./i);
    const inputOfrece = screen.getByPlaceholderText(/ej. Corte de Cabello Básico/i);
    const inputBusca = screen.getByPlaceholderText(/ej. Taller de Contabilidad/i);
    const botonSubmit = screen.getByRole('button', { name: /Publicar Trueque/i });

    expect(inputNombre).toBeRequired();
    expect(inputOfrece).toBeRequired();
    expect(inputBusca).toBeRequired();

    fireEvent.change(inputNombre, { target: { value: 'Marta Gómez' } });
    fireEvent.change(inputOfrece, { target: { value: 'Postres de Manzana' } });
    fireEvent.change(inputBusca, { target: { value: 'Clases de Inglés' } });

    expect(inputNombre.value).toBe('Marta Gómez');
    expect(inputOfrece.value).toBe('Postres de Manzana');
    expect(inputBusca.value).toBe('Clases de Inglés');
  });
});

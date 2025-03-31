
import { PropsWithChildren } from 'react';
import './spinner.css';
import { usePreviewsLoadingSelector } from '../../store/place-data/selectors';

export default function Spinner({ children }: PropsWithChildren) {
  const isLoading = usePreviewsLoadingSelector();

  if (isLoading) {
    return (
      <div className="spin-wrapper" >
        <div className="spinner" >
        </div>
      </div>
    );
  }

  return children;

}

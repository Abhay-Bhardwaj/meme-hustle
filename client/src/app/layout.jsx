'use client';
import './globals.css';
import { Provider } from 'react-redux';
import store from '../store';
import { Toaster } from "@/components/ui/sonner"



export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
    
      <html lang="en">
        <body>{children}
          <Toaster richColors/>
        </body>
        
      </html>
    </Provider>
  );
}
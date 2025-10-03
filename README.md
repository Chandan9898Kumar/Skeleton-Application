# Banking Demo App

A modern React banking application demonstrating reusable skeleton loading states and virtual list performance optimization for large datasets.

## 🚀 Features

- **Skeleton Loading States**: Smooth loading animations that match the actual content layout
- **Virtual Lists**: High-performance rendering of large transaction lists (200+ items)
- **Mock Banking API**: Realistic banking data simulation with network delays
- **Responsive Design**: Mobile-friendly interface with modern CSS styling
- **Type Safety**: Full TypeScript implementation with strict type checking
- **Modern React**: Built with React 19, React Router, and TanStack Query

## 🏗️ Architecture

### Core Components

- **Skeleton Component**: Reusable loading placeholder with multiple variants (text, circle, rect)
- **VirtualList Component**: Performance-optimized list rendering with viewport-based item rendering
- **Account Page**: Main dashboard displaying balance and transaction history
- **Mock API**: Simulated banking endpoints with realistic delays

### Key Technologies

- **React 19** - Latest React features and performance improvements
- **TypeScript** - Type-safe development experience
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **TanStack Query** - Server state management
- **CSS Modules** - Scoped styling approach

## 📁 Project Structure

```
skeleton-app/
├── src/
│   ├── api/
│   │   ├── mockApi.ts          # Banking API simulation
│   │   └── mockBankApi.ts      # Additional mock endpoints
│   ├── components/
│   │   ├── Skeleton.tsx        # Reusable skeleton loader
│   │   └── VirtualList.tsx     # Performance-optimized list
│   ├── pages/
│   │   ├── Account.tsx         # Main account dashboard
│   │   ├── AccountSelection.tsx
│   │   ├── AmountEntry.tsx
│   │   ├── Index.tsx           # Landing page
│   │   ├── PayeeSelection.tsx
│   │   ├── ReviewTransfer.tsx
│   │   ├── TransferError.tsx
│   │   └── TransferSuccess.tsx
│   ├── styles/
│   │   ├── account.css         # Account page styles
│   │   ├── skeleton.css        # Skeleton component styles
│   │   └── ...                 # Other component styles
│   ├── hooks/
│   │   └── use-mobile.tsx      # Mobile detection hook
│   ├── App.tsx                 # Main app component
│   └── main.tsx               # App entry point
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd skeleton-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🎯 Key Features Explained

### Skeleton Loading States

The `Skeleton` component provides smooth loading animations that match the actual content:

- **Multiple Variants**: Text, large text, circle, and rectangle shapes
- **Customizable**: Width, height, and styling can be adjusted
- **Realistic Layouts**: Skeleton placeholders mirror the final content structure

### Virtual List Performance

The `VirtualList` component optimizes rendering for large datasets:

- **Viewport Rendering**: Only renders visible items plus overscan buffer
- **Smooth Scrolling**: Maintains 60fps performance with thousands of items
- **Memory Efficient**: Constant memory usage regardless of list size
- **Configurable**: Adjustable item height and overscan settings

### Mock Banking API

Realistic banking data simulation includes:

- **Account Information**: Balance, account number, currency
- **Transaction History**: Generated transactions with realistic patterns
- **Network Delays**: Simulated API response times (300-500ms)
- **Data Variety**: Multiple transaction types, categories, and amounts

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional banking interface
- **Loading States**: Skeleton placeholders prevent layout shifts
- **Responsive Layout**: Works seamlessly on desktop and mobile
- **Smooth Animations**: CSS transitions and hover effects
- **Accessibility**: Semantic HTML and keyboard navigation support

## 🔧 Development Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## 📊 Performance Optimizations

1. **Virtual Scrolling**: Handles 200+ transactions without performance degradation
2. **Component Memoization**: Prevents unnecessary re-renders
3. **Lazy Loading**: Components load only when needed
4. **Optimized Bundling**: Vite's efficient build process
5. **Tree Shaking**: Removes unused code from final bundle

## 🚦 Getting Started

1. Visit the landing page at `/`
2. Click "View Account" to see the main dashboard
3. Observe skeleton loading states while data loads
4. Scroll through the transaction list to see virtual scrolling in action
5. Navigate through different pages to explore the full banking flow

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React team for the excellent framework
- Vite team for the blazing-fast build tool
- TanStack team for the powerful query library
- Open source community for inspiration and best practices
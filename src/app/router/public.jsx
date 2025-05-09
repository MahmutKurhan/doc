// Import Dependencies
import { Navigate } from "react-router-dom"; // react-router-dom'dan import edilmeli

// Local Imports
// ...mevcut importlar...

// ----------------------------------------------------------------------

const publicRoutes = {
  id: "public",
  children: [
    // ...mevcut rotalar...
    
    // Documents sayfası - herkese açık
    {
      path: "documents",
      lazy: async () => ({
        Component: (await import("app/pages/Documents")).default,
      }),
    },
    
    // Belge detayları sayfası
    {
      path: "documents/details/:id",
      lazy: async () => ({
        Component: (await import("app/pages/documents/details")).default,
      }),
    },
    
    // İletişim sayfası
    {
      path: "contact",
      lazy: async () => ({
        Component: (await import("app/pages/Contact")).default,
      }),
    },
    
    // About sayfası
    {
      path: "about",
      lazy: async () => ({
        Component: (await import("app/pages/About")).default,
      }),
    },
    // Blog sayfası
    {
      path: "blog",
      lazy: async () => ({
        Component: (await import("app/pages/Blog")).default,
      }),
    },
    // Blog detay sayfası
    {
      path: "blog/:slug",
      lazy: async () => ({
        Component: (await import("app/pages/blog/BlogDetail")).default,
      }),
    },
    // createDoc sayfası
    {
      path: "createDoc",
      lazy: async () => ({
        Component: (await import("app/pages/createDoc")).default,
      }),
    },
    // 404 ve diğer hatalar
    {
      path: "*",
      element: <Navigate to="/404" />,
    },
  ],
};

export { publicRoutes };

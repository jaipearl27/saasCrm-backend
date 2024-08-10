const availableRoles = {
  SUPER_ADMIN: 0,
  ADMIN: 1,
  EMPLOYEE_SALES: 2,
  EMPLOYEE_REMINDER: 3,
};

// isSuperAdmin -- function to check whether the user is super admin or not
export const isSuperAdmin = (role) => {
  return (req, res, next) => {
    if (role !== availableRoles.SUPER_ADMIN) {
      return res.status(400).json({
        success: false,
        message: "Un-Authorized Access to the resource",
      });
    }
    next();
  };
};

// isAdmin -- function to check whether the user is admin or not
export const isAdmin = (role) => {
  return (req, res, next) => {
    if (role !== availableRoles.ADMIN) {
      return res.status(400).json({
        success: false,
        message: "Un-Authorized Access to the resource",
      });
    }
    next();
  };
};

// isEmployee -- function to check whether the user is employee or not
export const isEmployee = (role) => {
  return (req, res, next) => {
    if (role !== availableRoles.EMPLOYEE) {
      return res.status(400).json({
        success: false,
        message: "Un-Authorized Access to the resource",
      });
    }
    next();
  };
};

// isCoder -- function to check whether the user is coder or not
export const isCoder = () => {
  return (req, res, next) => {
    if (role !== availableRoles.CODER) {
      return res.status(400).json({
        success: false,
        message: "Un-Authorized Access to the resource",
      });
    }
    next();
  };
};

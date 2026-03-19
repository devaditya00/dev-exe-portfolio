const validate = (schema) => (req, res, next) => {
  try {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error?.issues?.map((e) => ({
        field: e.path[0],
        message: e.message,
      })) || [];

      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors,
      });
    }

    req.body = result.data;
    next();
  } catch (err) {
    next(err);
  }
};

export default validate;
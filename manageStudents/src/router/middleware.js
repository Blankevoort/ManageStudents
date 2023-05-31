import { Cookies } from "quasar";
import { api } from "src/boot/axios";

export function getUser() {
  return new Promise((resolve, reject) => {
    api
      .get('auth/users/me/', {
        headers: {
          Authorization: 'Token ' + Cookies.get('token'),
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function checkAccess(to, from, next) {
  const userToken = Cookies.get('token');

  if (to.meta.requireAuth) {
    if (userToken) {
      getUser()
        .then((user) => {
          const userType = user.type;

          if (userType === 'مدیر' && to.meta.headmasterAccess) {
            next();
          } else if (userType === 'معاون' && to.meta.deputyAccess) {
            next();
          } else if (userType === 'معلم' && to.meta.teacherAccess) {
            next();
          } else {
            next('/access-denied');
          }
        })
        .catch(() => {
          next('/access-denied');
        });
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath,
        },
      });
    }
  } else if (to.meta.login) {
    if (userToken) {
      next({
        path: '/',
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      next();
    }
  } else {
    next();
  }
}

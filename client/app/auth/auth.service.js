'use strict';

angular.module('classify')
    .service('$auth', function ($q, $location,$http) {
    var auth = {};
    var currentUser = {};
    var usersLoginData = null;

    // getting the data of the users
    $http.get('app/auth/user-data.json').then(function (success) {
            usersLoginData = success.data;
        }
    , function (error) {
    });

    // login the user if correct
    auth.isLoggedIn = function () {
        return $q(function (resolve, reject)
        {
               if(currentUser){
                   resolve(true);
               }
               else {
                   reject("No user");
               }
         });
    };

    auth.currentUser = function () {
        console.log(currentUser);
        return $q(function (resolve, reject) {
            if (currentUser!= null)
            {
                return resolve(currentUser);
            }
            else{
                return reject();
            }
        });
    };

    auth.login = function (user)
    {
        return $q(function (resolve, reject)
        {
           if(usersLoginData!= null)
            {
                // checking if there is user By that name
                var foundUser = _.find(usersLoginData, function (o) {
                    if (o.userid == user.userid)
                    {
                        return o;
                    } else {
                        return null;
                    }
                });

                if (foundUser == null)
                {
                    return reject("user name doesnt exist");
                }
                else if (foundUser.password ==user.password)
                {
                    currentUser = foundUser;

                    $location.path("/home");

                    return resolve('Logged in!');
                }
                else {
                    return reject ("Wrong Password")
                }
             }

        });
    };

    auth.register = function(user)
    {
        return $q(function (resolve, reject)
        {
              // checking if there is user By that name
                var foundUser = _.find(usersLoginData, function (o) {
                    if (o.userid == user.userid)
                    {
                        return o;
                    } else {
                        return null;
                    }
                });

                if (foundUser != null)
                {
                    return reject("user already exist");
                }
                else
                {
                    var json = JSON.stringify(user);

                     usersLoginData.push(user);
                    currentUser = user;
                    $location.path("/login");
                    return resolve('Registered!');


                }
        });
    };

    auth.logout = function () {
        currentUser = "";

        return $q(function (resolve, reject)
        {
            $location.path("/login");
            return resolve();

        });
    };

    return auth;
});
# Release Notes for Commudle Web Application

## 25 Aug, 2023

### FE

#### Features

- **Google places api enabled for location search in**
  - user profile location
  - community location
  - event agenda address location

---

## 22 Aug, 2023

### FE

#### Optimizations

- Upcoming events sidebar card has a ==View All== button which redirects to events list page. This was ealier a load more button which loaded more events.
- Add large footer on all listing pages and user profile page.
- Truncate long answers on the form responses page inside event admin dashboard

---

## 16 Aug, 2023

### FE

#### Fixes

- On the builds view page
  - disable prev-next buttons from image viewing popup if there is only one image
  - use standard image component to showcase each image in a common sized frame for better viewing
  - make prev-next buttons for image viewing to be operable by <- and -> keys
- Community Channels and Forums
  - Remove scroll from the list of channels/forums in the left sidebar
  - Add lineclamp to name and description in the channels/forums cards.
- Listing public pages: Fix max height of the banner on mobile view

---

## 9 Aug, 2023

## FE

#### Content

- 🚀 **Added GDPR in the footer, we are now GDPR compliant!**

---

## 7 Aug, 2023

### FE

#### Optimization

- Survey Forms: Moved the ==Create Form== button inside the dropdown of list of forms
- Created New Form Popup in Community / Event Admin: Change from window to popup

#### Fixes

- Survey Forms: Fixed the width of create survey form as it was fluctuating based on the text length.
- Removed scroll from talks at events on user profile.
- Change utm_medium on newsletter preview webpage from email to webapp
- Redirected the send message button on user's profile to login.
- Job Page: Changed the disabled 'login to apply' button to take the user to login and back.

---

## 4 Aug, 2023

### FE

#### Fixes

- Communities listing page:
  - fix community logos, they were appearing stretched.
  - remove extra skeleton loader which appeared during scroll.
- Fill data form page: remove scroll from question cards.

---

## 2 Aug, 2023

### FE

#### Optimization

- Event admin dashboard: Attach form in registrations has a separate create new form button, it is now moved to dropdown of form select for better visibility during the flow of use.

---

## 31 Jul, 2023

### FE

#### Feature

- Search on Listing Pages: The url now changes as per the searched keyword, this will improve the SEO in case we have to submit specific search results for a query.

#### Optimization

- Edit form: Changed the uneditable field from disabled to readonly for better visibility.

#### Fix

- Fixed search while adding featured items as super admin

---

## 28 Jul, 2023

### FE

#### Feature

- 🚀 🛠 **New layout of communities list page is live!**

#### Fix

- Create build form: Fixed the validation of fields which was not working properly earlier

---

## 26 Jul, 2023

### FE

#### Feature

- 🚀 **Events can now be cloned till the depth of attached registration forms, details and type of agenda**

#### Fix

- Event Admin Dashboard
  - Fixed the scroll height of left sidebar menu, it is now fixed as per the screen height
  - Fixed the mobile view, move the left sidebar menu to top horizontal scroll menu
  - Reorder and categorize (group) menu items

#### Feature

- 🚀 🛠 **Bulk registration status change for event registrations now has option to choose ==from status== and ==to status==.**

#### Optimization

- Moved left sidebar from being used directly as a sub component to independently be operated using a service. This will enable us to create multiple instances of this component and re-use it more flexibly.

---

## 24 Jul, 2023

### FE

#### Optimization

- Event public page: Added view more option to list of volunteers as the page was getting too long.
- Attended members list: Add empty state

---

## 23 Jul, 2023

### FE

#### Feature

- 🚀 🛠 **Now we have made featured items as generic and deprecate the older featured communities. Communities, Events, Builds, Labs, Channels, etc everything can be featured now.**

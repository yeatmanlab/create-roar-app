# Retrieving assessment data

How to query and retrieve experiment data

---

Once you have deployed your experiment, you will want to retrieve its data to assess it's performance in evaluating your participants' abilities. You can view assessment data one trial at a time by browsing the Firestore database in your web browser or you can bulk download trial information using the [roarquery tool](https://roarquery.readthedocs.io/en/latest/).

## Browsing ROAR data online

You can browse your Firestore database's data online by navigating to the [Cloud Firestore Data tab](https://console.firebase.google.com/project/_/firestore/data) in your browser. From there, you can view, and query data. See [this guide](https://firebase.google.com/docs/firestore/using-console) for more details on how to do that.

## Retrieving ROAR data from the command line

The Firestore Data console is convenient for viewing a small number of database records at a time. But when you want to view or download many data records at a time, it is often easier to use a command line tool. For this reason, we created the [roarquery command line tool](https://roarquery.readthedocs.io/en/latest/index.html). See the [installation](https://roarquery.readthedocs.io/en/latest/index.html#installation) and [authentication](https://roarquery.readthedocs.io/en/latest/index.html#authentication) sections of the roarquery documentation to setup your roarquery tool. Then see the [usage](https://roarquery.readthedocs.io/en/latest/usage.html) page to learn how to use roarquery to filter and retrieve a large number of ROAR trials.

import React from 'react';

const Version = (props) => {
  return (
    <div>


      <h4>v0.1</h4>
      <p>
        Changelog: ...
      </p>

      <h4>FIXME</h4>
        <ul>
          <li>Empty fields</li>
          <li>Recognize field types - number from strings</li>

        </ul>

      <h4>TODO</h4>

        <h5>How to</h5>
        <ul>
          <li><s>Drag and drop upload</s></li>
          <li>Import data wizard, csv, tsv, excel</li>
          <li> Mappers</li>

          <li>Kaleidoscope for tree - shuffle groups</li>
          <li>Data analysis - estimate default visualisation</li>


          <li>Session base rules storage</li>
          <li>Store rules</li>
        </ul>

        <h5>Backend</h5>
        <ul>
            <li>Fetch data</li>
            <li>Connect to burger output</li>
            <li> - Create, store and share queries</li>



            <li>Store Reports (source, rules, projection)</li>
            <li>Add user management and sharing</li>
          </ul>

    </div>
  );
}

export default Version;
